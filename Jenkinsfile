pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'Sonar'  // Assurez-vous que 'Sonar' correspond au nom de l'installation dans Jenkins
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('SonarQube Analysis - Laravel') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh "${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=bocomTransport -Dsonar.sources=sonef-app-laravel -Dsonar.host.url=http://172.17.0.3:9000 -Dsonar.token=sqp_4d2e0f8b1c7259b414bdb6ca5f05f8001b2c21a2"
                    }
                }
            }
        }
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
