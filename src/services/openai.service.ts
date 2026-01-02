import OpenAI from 'openai';
import { aiConfig } from '@configs';
import { generateId, logger } from '@utils';

export class OpenAIService {
  private static instance: OpenAIService;
  private client: OpenAI;

  private constructor() {
    this.client = new OpenAI({
      apiKey: aiConfig.open_ai_api_key,
    });
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async analyzeStatement(fileContent: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const systemPrompt = aiConfig.prompt;
      const userPrompt = `BELOW IS THE DATA TO BE ANALYZED:\n\n${fileContent}`;
      logger.log('System Prompt:', systemPrompt);
      logger.info('Starting OpenAI analysis with gpt-4o-mini');

      const response = await this.client.chat.completions.create({
        model: aiConfig.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'text' },
        temperature: 1,
        max_completion_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        logger.error('OpenAI returned empty response');
        return { success: false, error: 'AI returned empty response' };
      }

      console.log('OpenAI Response Content:', content);

      // Try to parse as JSON
      try {
        const parsedData = JSON.parse(content);
        logger.info('OpenAI analysis completed successfully');
        return { success: true, data: parsedData };
      } catch (parseError) {
        logger.error('Failed to parse OpenAI response as JSON', parseError);
        return { success: false, error: 'Failed to parse AI response as JSON' };
      }
    } catch (error: any) {
      logger.error('OpenAI analysis error', error);

      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return { success: false, error: 'Analysis timed out after 10 minutes' };
      }

      return { success: false, error: error.message || 'OpenAI analysis failed' };
    }
  }

  async analyzeFileStatement(
    fileBuffer: Buffer,
    fileName: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    let uploadedFileId: string | null = null;

    try {
      const systemPrompt = aiConfig.prompt;
      logger.info(`Starting OpenAI file-based analysis for ${fileName} with ${aiConfig.model}`);

      // Step 1: Upload file to OpenAI Files API
      logger.info(`Uploading file ${fileName} to OpenAI...`);
      const uploadedFile = await this.client.files.create({
        purpose: 'assistants',
        file: new File([fileBuffer], fileName),
      });

      uploadedFileId = uploadedFile.id;
      logger.info(`File uploaded successfully with ID: ${uploadedFileId}`);
      logger.info('Proceeding to analyze the uploaded file...');
      // Step 2: Use the file_id in chat completion
      const response = await this.client.chat.completions.create({
        model: aiConfig.model,
        messages: [
          {
            role: 'developer',
            content: [
              {
                type: 'text',
                text: systemPrompt,
              },
            ],
          } as any,
          {
            role: 'user',
            content: [
              {
                type: 'file',
                file: {
                  file_id: uploadedFileId,
                },
              },
            ],
          } as any,
        ],
        response_format: { type: 'json_object' },
        // @ts-ignore - Extended parameters
        verbosity: 'medium',
        // @ts-ignore
        reasoning_effort: 'medium',
        // @ts-ignore
        store: false,
      } as any, {
        timeout: 600000, // 10 minutes
      });

      logger.info('OpenAI file-based analysis response received');

      const content = response.choices[0]?.message?.content;

      if (!content) {
        logger.error('OpenAI returned empty response');
        return { success: false, error: 'AI returned empty response' };
      }

      // Try to parse as JSON
      try {
        const parsedData = JSON.parse(content);
        logger.info('OpenAI file-based analysis completed successfully');
        return { success: true, data: parsedData };
      } catch (parseError) {
        logger.error('Failed to parse OpenAI response as JSON', parseError);
        return { success: false, error: 'Failed to parse AI response as JSON' };
      }
    } catch (error: any) {
      logger.error('OpenAI file-based analysis error', error);

      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return { success: false, error: 'Analysis timed out after 10 minutes' };
      }

      return { success: false, error: error.message || 'OpenAI analysis failed' };
    } finally {
      // Step 3: Clean up uploaded file
      if (uploadedFileId) {
        try {
          await this.client.files.delete(uploadedFileId);
          logger.info(`Cleaned up uploaded file: ${uploadedFileId}`);
        } catch (cleanupError: any) {
          logger.warn(`Failed to delete uploaded file ${uploadedFileId}:`, cleanupError.message);
        }
      }
    }
  }
}

export const openAIService = OpenAIService.getInstance();
