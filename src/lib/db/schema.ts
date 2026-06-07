export const coreSchemaStatements = [
  `
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      display_name VARCHAR(255) NOT NULL,
      role VARCHAR(100) NOT NULL DEFAULT 'member',
      avatar_url VARCHAR(2048) NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY users_email_unique (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,
  `
    CREATE TABLE IF NOT EXISTS news_posts (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      slug VARCHAR(160) NOT NULL,
      title VARCHAR(255) NOT NULL,
      summary TEXT NULL,
      content LONGTEXT NULL,
      cover_image_url VARCHAR(2048) NULL,
      published_at DATETIME NULL,
      is_published TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY news_posts_slug_unique (slug),
      KEY news_posts_published_idx (is_published, published_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,
  `
    CREATE TABLE IF NOT EXISTS tournaments (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      slug VARCHAR(160) NOT NULL,
      name VARCHAR(255) NOT NULL,
      game VARCHAR(120) NOT NULL,
      summary TEXT NULL,
      form_url VARCHAR(2048) NOT NULL,
      detail_url VARCHAR(2048) NOT NULL,
      uploaded_at DATETIME NOT NULL,
      event_date DATETIME NOT NULL,
      registration_closes_at DATETIME NULL,
      format VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      slots_info VARCHAR(255) NOT NULL,
      location_label VARCHAR(255) NULL,
      is_archived TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY tournaments_slug_unique (slug),
      KEY tournaments_archive_idx (is_archived, event_date),
      KEY tournaments_game_idx (game)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,
];
