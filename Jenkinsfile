pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Clone your app's repository
                git url: 'https://github.com/ArtemiiLiakh/jenkins-test', branch: 'master'
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t backend .'
            }
        }

        stage('Run PostgreSQL and Application') {
            steps {
                script {
                    // Start PostgreSQL container
                    def postgres = docker.image('postgres:latest').run(
                        '-e POSTGRES_USER=postgres ' +
                        '-e POSTGRES_PASSWORD=postgres ' +
                        '-e POSTGRES_DB=postgres ' +
                        '-p 5432:5432'
                    )
                    
                    // Wait for PostgreSQL to be ready
                    sh 'while ! docker exec $(docker ps -q -f "ancestor=postgres:latest") pg_isready -U postgres -d postgres; do sleep 1; done'
                    
                    sh '''
                        export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
                        
                        npm ci && npm run db:generate && npm run db:sync
                        
                        npm run test
                    '''
                    
                    sh 'echo "Application is running and connected to PostgreSQL"'
                }
            }
        }
    }
    post {
        always {
            sh 'docker stop $(docker ps -q -f "ancestor=postgres:latest") || true'
            sh 'docker rm $(docker ps -aq -f "ancestor=postgres:latest") || true'
        }
    }
}