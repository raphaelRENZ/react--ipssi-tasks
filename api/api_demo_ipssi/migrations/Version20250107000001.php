<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Migration pour creer la table "user" (authentification JWT)
 */
final class Version20250107000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Creation de la table user pour l authentification JWT';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('
            CREATE TABLE "user" (
                id SERIAL NOT NULL,
                email VARCHAR(180) NOT NULL,
                roles JSON NOT NULL,
                password VARCHAR(255) NOT NULL,
                firstname VARCHAR(100) DEFAULT NULL,
                lastname VARCHAR(100) DEFAULT NULL,
                created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                PRIMARY KEY(id),
                CONSTRAINT uniq_identifier_email UNIQUE (email)
            )
        ');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE IF EXISTS "user"');
    }
}
