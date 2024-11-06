pipeline {
    agent { label 'docker-agent'}

    environment {
        DOCKER_IMAGE_NAME = 'user-management-frontend'  // Docker image name
        DOCKER_CREDENTIALS = 'Dockerhub'  // Jenkins credentials ID for Docker login
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/nhatnam99132/user-management-frontend.git']]])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Get the commit ID for tagging the image
                    def commitID = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    def imageName = "namtn6/${DOCKER_IMAGE_NAME}:${commitID}"

                    // Build the Docker image
                    echo "Building Docker image with tag: ${imageName}"
                    sh "docker build -t ${imageName} ."
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    // Login to Docker Hub using credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Get the commit ID for tagging the image
                    def commitID = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    def imageName = "namtn6/${DOCKER_IMAGE_NAME}:${commitID}"

                    // Push Docker image to Docker Hub
                    echo "Pushing Docker image to Docker Hub: ${imageName}"
                    sh "docker push ${imageName}"
                }
            }
        }
    }

    post {
        always {
            // Clean up or other final actions if needed
            echo 'Pipeline finished.'
        }
    }
}
