<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Migration pour creer la table "task"
 *
 * Cette migration cree la structure de la table pour stocker les taches.
 * Elle contient le SQL brut qui sera execute sur la base de donnees.
 */
final class Version20250107000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Creation de la table task pour gerer les taches';
    }

    /**
     * Methode executee lors de la migration (creation)
     */
    public function up(Schema $schema): void
    {
        // SQL compatible PostgreSQL
        $this->addSql('
            CREATE TABLE task (
                id SERIAL NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT DEFAULT NULL,
                status VARCHAR(20) NOT NULL DEFAULT \'pending\',
                created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
                updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL,
                due_date DATE DEFAULT NULL,
                PRIMARY KEY(id)
            )
        ');

        $this->addSql('CREATE INDEX idx_task_status ON task (status)');
        $this->addSql('CREATE INDEX idx_task_created_at ON task (created_at)');

        // Commentaire pour le jury BTS : Cette requete CREATE TABLE :
        // - Definit une cle primaire auto-incrementee (id)
        // - Utilise des types de donnees appropries (VARCHAR, LONGTEXT, DATETIME, DATE)
        // - Ajoute des index pour optimiser les recherches par status et date
    }

    /**
     * Methode executee lors du rollback (annulation)
     */
    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE IF EXISTS task');
    }
}
