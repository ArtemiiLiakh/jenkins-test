pipeline {
    agent any

    tools{
        nodejs 'node'
    }

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

        stage('Testing') {
            steps {
                script {
                    sh 'docker network create db-net || true'
                    // Start PostgreSQL container
                    def postgres = docker.image('postgres:17-alpine').run(
                        '--network db-net ' +
                        '-e POSTGRES_USER=postgres ' +
                        '-e POSTGRES_PASSWORD=postgres ' +
                        '-e POSTGRES_DB=postgres ' +
                        '-p 5432:5432 ' + 
                        '--name database'
                    )
                    
                    // Wait for PostgreSQL to be ready
                    sh 'while ! docker exec database pg_isready -U postgres -d postgres; do sleep 1; done'
                    
                    sh '''
                        docker run --rm \
                        --network db-net \
                        -v $(pwd):/app \
                        -w /app \
                        -e DATABASE_URL="postgresql://postgres:postgres@database:5432/postgres" \
                        node:20-alpine \
                        sh -c "npm ci && npm run db:generate && npm run db:sync && npm run test:coverage"
                    '''
                    
                    sh 'echo "Application is running and connected to PostgreSQL"'
                }
            }
            post{
                success {
                    step([$class: 'CoberturaPublisher', coberturaReportFile:'coverage/cobertura-coverage.xml'])
                    junit 'coverage/junit.xml'
                }
            }
        }
    }
    post {
        always {
            sh 'docker stop database || true'
            sh 'docker rm database || true'
        }
    }
}