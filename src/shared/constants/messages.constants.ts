// Supported Languages
export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'en',
  SPANISH: 'es',
  FRENCH: 'fr',
} as const;

export type Language = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES];

// Message Keys for type-safe references
export const MESSAGE_KEYS = {
  // Success
  SUCCESS: 'SUCCESS',
  USER_CREATED: 'USER_CREATED',
  USER_REGISTERED: 'USER_REGISTERED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  RESOURCE_CREATED: 'RESOURCE_CREATED',
  RESOURCE_UPDATED: 'RESOURCE_UPDATED',
  RESOURCE_DELETED: 'RESOURCE_DELETED',

  // Errors
  BAD_REQUEST: 'BAD_REQUEST',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',

  // User-specific
  USERNAME_EXISTS: 'USERNAME_EXISTS',
  USERNAME_TAKEN: 'USERNAME_TAKEN',
  EMAIL_TAKEN: 'EMAIL_TAKEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SIGNUP_FAILED: 'SIGNUP_FAILED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  USERNAME_CHECK_FAILED: 'USERNAME_CHECK_FAILED',
  FAILED_TO_GET_USER: 'FAILED_TO_GET_USER',
  FAILED_TO_GET_USERS: 'FAILED_TO_GET_USERS',
  FAILED_TO_CREATE_USER: 'FAILED_TO_CREATE_USER',
  USER_FETCHED: 'USER_FETCHED',
  USER_FETCH_FAILED: 'USER_FETCH_FAILED',
  USER_UPDATED: 'USER_UPDATED',
  USER_UPDATE_FAILED: 'USER_UPDATE_FAILED',
  TOKEN_REQUIRED: 'TOKEN_REQUIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',

  // Rate limiting
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  TOO_MANY_AUTH_ATTEMPTS: 'TOO_MANY_AUTH_ATTEMPTS',

  // File processing
  FILE_PROCESSED_SUCCESS: 'FILE_PROCESSED_SUCCESS',
  FILE_PROCESSING_FAILED: 'FILE_PROCESSING_FAILED',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_REQUIRED: 'FILE_REQUIRED',

  // Analysis
  ANALYSIS_JOB_CREATED: 'ANALYSIS_JOB_CREATED',
  ANALYSIS_JOB_CREATION_FAILED: 'ANALYSIS_JOB_CREATION_FAILED',
  ANALYSES_FETCHED: 'ANALYSES_FETCHED',
  ANALYSES_FETCH_FAILED: 'ANALYSES_FETCH_FAILED',
  ANALYSIS_FETCHED: 'ANALYSIS_FETCHED',
  ANALYSIS_FETCH_FAILED: 'ANALYSIS_FETCH_FAILED',
  ANALYSIS_NOT_FOUND: 'ANALYSIS_NOT_FOUND',
  INVALID_REQUEST: 'INVALID_REQUEST',

  // Quota and Tier
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  QUOTA_UPDATED: 'QUOTA_UPDATED',
  QUOTA_UPDATE_FAILED: 'QUOTA_UPDATE_FAILED',
  TIER_UPDATED: 'TIER_UPDATED',
  TIER_UPDATE_FAILED: 'TIER_UPDATE_FAILED',
  USERS_FETCHED: 'USERS_FETCHED',

  // Validation comments
  VALIDATION_FAST: 'VALIDATION_FAST',
  VALIDATION_GENIUS: 'VALIDATION_GENIUS',
  VALIDATION_INSANE: 'VALIDATION_INSANE',
  VALIDATION_GOOD: 'VALIDATION_GOOD',
  VALIDATION_RARE: 'VALIDATION_RARE',
  VALIDATION_NICE: 'VALIDATION_NICE',
  VALIDATION_EXCELLENT: 'VALIDATION_EXCELLENT',
} as const;

export type MessageKey = keyof typeof MESSAGE_KEYS;

export const MESSAGES = {
  // Success messages
  SUCCESS: {
    en: 'Request successful',
    es: 'Solicitud exitosa',
    fr: 'Demande réussie',
  },
  USER_CREATED: {
    en: 'User created successfully',
    es: 'Usuario creado exitosamente',
    fr: 'Utilisateur créé avec succès',
  },
  USER_REGISTERED: {
    en: 'User registered successfully',
    es: 'Usuario registrado exitosamente',
    fr: 'Utilisateur enregistré avec succès',
  },
  LOGIN_SUCCESS: {
    en: 'Login successful',
    es: 'Inicio de sesión exitoso',
    fr: 'Connexion réussie',
  },
  RESOURCE_CREATED: {
    en: 'Resource created successfully',
    es: 'Recurso creado exitosamente',
    fr: 'Ressource créée avec succès',
  },
  RESOURCE_UPDATED: {
    en: 'Resource updated successfully',
    es: 'Recurso actualizado exitosamente',
    fr: 'Ressource mise à jour avec succès',
  },
  RESOURCE_DELETED: {
    en: 'Resource deleted successfully',
    es: 'Recurso eliminado exitosamente',
    fr: 'Ressource supprimée avec succès',
  },

  // Error messages
  BAD_REQUEST: {
    en: 'Bad request',
    es: 'Solicitud incorrecta',
    fr: 'Mauvaise demande',
  },
  VALIDATION_FAILED: {
    en: 'Validation failed',
    es: 'Validación fallida',
    fr: 'Échec de la validation',
  },
  UNAUTHORIZED: {
    en: 'Unauthorized',
    es: 'No autorizado',
    fr: 'Non autorisé',
  },
  FORBIDDEN: {
    en: 'Forbidden',
    es: 'Prohibido',
    fr: 'Interdit',
  },
  NOT_FOUND: {
    en: 'Resource not found',
    es: 'Recurso no encontrado',
    fr: 'Ressource non trouvée',
  },
  USER_NOT_FOUND: {
    en: 'User not found',
    es: 'Usuario no encontrado',
    fr: 'Utilisateur non trouvé',
  },
  INTERNAL_SERVER_ERROR: {
    en: 'Internal server error',
    es: 'Error interno del servidor',
    fr: 'Erreur interne du serveur',
  },

  // User-specific messages
  USERNAME_EXISTS: {
    en: 'Username already exists',
    es: 'El nombre de usuario ya existe',
    fr: "Le nom d'utilisateur existe déjà",
  },
  INVALID_CREDENTIALS: {
    en: 'Invalid username or password',
    es: 'Usuario o contraseña inválidos',
    fr: "Nom d'utilisateur ou mot de passe invalide",
  },
  SIGNUP_FAILED: {
    en: 'Signup failed',
    es: 'Registro fallido',
    fr: "Échec de l'inscription",
  },
  LOGIN_FAILED: {
    en: 'Login failed',
    es: 'Inicio de sesión fallido',
    fr: 'Échec de la connexion',
  },
  USERNAME_CHECK_FAILED: {
    en: 'Failed to check username',
    es: 'Error al verificar el nombre de usuario',
    fr: "Échec de la vérification du nom d'utilisateur",
  },
  FAILED_TO_GET_USER: {
    en: 'Failed to get user',
    es: 'Error al obtener usuario',
    fr: "Échec de la récupération de l'utilisateur",
  },
  FAILED_TO_GET_USERS: {
    en: 'Failed to get users',
    es: 'Error al obtener usuarios',
    fr: 'Échec de la récupération des utilisateurs',
  },
  FAILED_TO_CREATE_USER: {
    en: 'Failed to create user',
    es: 'Error al crear usuario',
    fr: "Échec de la création de l'utilisateur",
  },
  USERNAME_TAKEN: {
    en: 'Username is already taken',
    es: 'El nombre de usuario ya está en uso',
    fr: "Le nom d'utilisateur est déjà pris",
  },
  EMAIL_TAKEN: {
    en: 'Email is already in use',
    es: 'El correo electrónico ya está en uso',
    fr: "L'email est déjà utilisé",
  },
  USER_FETCHED: {
    en: 'User fetched successfully',
    es: 'Usuario obtenido exitosamente',
    fr: 'Utilisateur récupéré avec succès',
  },
  USER_FETCH_FAILED: {
    en: 'Failed to fetch user',
    es: 'Error al obtener usuario',
    fr: "Échec de la récupération de l'utilisateur",
  },
  USER_UPDATED: {
    en: 'User updated successfully',
    es: 'Usuario actualizado exitosamente',
    fr: 'Utilisateur mis à jour avec succès',
  },
  USER_UPDATE_FAILED: {
    en: 'Failed to update user',
    es: 'Error al actualizar usuario',
    fr: "Échec de la mise à jour de l'utilisateur",
  },
  TOKEN_REQUIRED: {
    en: 'Authentication token is required',
    es: 'Se requiere token de autenticación',
    fr: "Le jeton d'authentification est requis",
  },
  INVALID_TOKEN: {
    en: 'Invalid or expired token',
    es: 'Token inválido o expirado',
    fr: 'Jeton invalide ou expiré',
  },

  // Rate limiting
  TOO_MANY_REQUESTS: {
    en: 'Too many requests from this IP, please try again later',
    es: 'Demasiadas solicitudes desde esta IP, inténtelo más tarde',
    fr: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard',
  },
  TOO_MANY_AUTH_ATTEMPTS: {
    en: 'Too many authentication attempts, please try again later',
    es: 'Demasiados intentos de autenticación, inténtelo más tarde',
    fr: "Trop de tentatives d'authentification, veuillez réessayer plus tard",
  },

  // File processing
  FILE_PROCESSED_SUCCESS: {
    en: 'File processed successfully',
    es: 'Archivo procesado exitosamente',
    fr: 'Fichier traité avec succès',
  },
  FILE_PROCESSING_FAILED: {
    en: 'Failed to process file',
    es: 'Error al procesar el archivo',
    fr: 'Échec du traitement du fichier',
  },
  INVALID_FILE_TYPE: {
    en: 'Invalid file type. Only CSV, TXT, and PDF files are allowed',
    es: 'Tipo de archivo inválido. Solo se permiten archivos CSV, TXT y PDF',
    fr: 'Type de fichier invalide. Seuls les fichiers CSV, TXT et PDF sont autorisés',
  },
  FILE_REQUIRED: {
    en: 'File is required',
    es: 'Se requiere un archivo',
    fr: 'Le fichier est requis',
  },

  // Analysis
  ANALYSIS_JOB_CREATED: {
    en: 'Analysis job created successfully',
    es: 'Trabajo de análisis creado exitosamente',
    fr: "Travail d'analyse créé avec succès",
  },
  ANALYSIS_JOB_CREATION_FAILED: {
    en: 'Failed to create analysis job',
    es: 'Error al crear trabajo de análisis',
    fr: "Échec de la création du travail d'analyse",
  },
  ANALYSES_FETCHED: {
    en: 'Analyses fetched successfully',
    es: 'Análisis obtenidos exitosamente',
    fr: 'Analyses récupérées avec succès',
  },
  ANALYSES_FETCH_FAILED: {
    en: 'Failed to fetch analyses',
    es: 'Error al obtener análisis',
    fr: 'Échec de la récupération des analyses',
  },
  ANALYSIS_FETCHED: {
    en: 'Analysis fetched successfully',
    es: 'Análisis obtenido exitosamente',
    fr: 'Analyse récupérée avec succès',
  },
  ANALYSIS_FETCH_FAILED: {
    en: 'Failed to fetch analysis',
    es: 'Error al obtener análisis',
    fr: "Échec de la récupération de l'analyse",
  },
  ANALYSIS_NOT_FOUND: {
    en: 'Analysis not found',
    es: 'Análisis no encontrado',
    fr: 'Analyse non trouvée',
  },
  INVALID_REQUEST: {
    en: 'Invalid request',
    es: 'Solicitud inválida',
    fr: 'Demande invalide',
  },

  // Quota and Tier
  QUOTA_EXCEEDED: {
    en: 'Analysis quota exceeded',
    es: 'Cuota de análisis excedida',
    fr: "Quota d'analyse dépassé",
  },
  QUOTA_UPDATED: {
    en: 'User quota updated successfully',
    es: 'Cuota de usuario actualizada exitosamente',
    fr: "Quota d'utilisateur mis à jour avec succès",
  },
  QUOTA_UPDATE_FAILED: {
    en: 'Failed to update user quota',
    es: 'Error al actualizar cuota de usuario',
    fr: "Échec de la mise à jour du quota d'utilisateur",
  },
  TIER_UPDATED: {
    en: 'User tier updated successfully',
    es: 'Nivel de usuario actualizado exitosamente',
    fr: "Niveau d'utilisateur mis à jour avec succès",
  },
  TIER_UPDATE_FAILED: {
    en: 'Failed to update user tier',
    es: 'Error al actualizar nivel de usuario',
    fr: "Échec de la mise à jour du niveau d'utilisateur",
  },
  USERS_FETCHED: {
    en: 'Users fetched successfully',
    es: 'Usuarios obtenidos exitosamente',
    fr: 'Utilisateurs récupérés avec succès',
  },

  // Validation comments
  VALIDATION_FAST: {
    en: 'Fast!',
    es: '¡Rápido!',
    fr: 'Rapide!',
  },
  VALIDATION_GENIUS: {
    en: 'Genius!',
    es: '¡Genio!',
    fr: 'Génie!',
  },
  VALIDATION_INSANE: {
    en: 'Insane!',
    es: '¡Increíble!',
    fr: 'Incroyable!',
  },
  VALIDATION_GOOD: {
    en: 'Good!',
    es: '¡Bien!',
    fr: 'Bien!',
  },
  VALIDATION_RARE: {
    en: 'Rare word!',
    es: '¡Palabra rara!',
    fr: 'Mot rare!',
  },
  VALIDATION_NICE: {
    en: 'Nice!',
    es: '¡Bueno!',
    fr: 'Bien!',
  },
  VALIDATION_EXCELLENT: {
    en: 'Excellent!',
    es: '¡Excelente!',
    fr: 'Excellent!',
  },
} as const;

export const getMessage = (key: MessageKey, lang: Language = 'en'): string => {
  return MESSAGES[key][lang] || MESSAGES[key].en;
};
