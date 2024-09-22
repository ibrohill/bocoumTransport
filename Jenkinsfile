pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'Sonar'  // Nom de l'installation SonarQube Scanner configurée dans Jenkins
    }

    stages {
        stage('SonarQube Analysis - Laravel') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=bocomTransportLaravel -Dsonar.sources=sonef-app-laravel -Dsonar.host.url=http://172.17.0.3:9000 -Dsonar.token=sqp_4d2e0f8b1c7259b414bdb6ca5f05f8001b2c21a2"
                    }
                }
            }
        }
        stage('SonarQube Analysis - Angular') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=bocomTransportAngular -Dsonar.sources=sonef-app-angular -Dsonar.host.url=http://172.17.0.3:9000 -Dsonar.token=sqp_4d2e0f8b1c7259b414bdb6ca5f05f8001b2c21a2"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
