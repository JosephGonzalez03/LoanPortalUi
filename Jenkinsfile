pipeline {
    agent any
    stages {
        stage('Run Unit Tests') {
            steps {
                sh '''
                    api_test_image=${JOB_NAME%/*} + '-test'

                    docker-compose build api_test_image
                    docker-compose run --rm api_test_image
                    docker rmi api_test_image
                '''
            }
        }

        stage('Tag Docker Image & Publish to Docker Hub') {
            when {
                changelog ".*--tag-image.*|.*feat:.*|.*refactor:.*|.*fix:.*|.*test:.*"
            }
            environment {
                DOCKER_CREDENTIALS = credentials('docker_credentials')
            }
            steps {
                sh '''
                    api_image=${JOB_NAME%/*}
                    tagged_api_image=${DOCKER_CREDENTIALS_USR}/$api_image:${BRANCH_NAME}

                    docker-compose build
                    docker tag $api_image $tagged_api_image
                    echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin
                    docker push $tagged_api_image
                    docker logout
                    docker rmi $api_image $tagged_api_image
                '''
            }
        }
    }
}
