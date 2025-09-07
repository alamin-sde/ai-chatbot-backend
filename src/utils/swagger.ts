import { Express } from "express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { version } from "../../package.json"


const options: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ]
        ,
        servers: [
            {
                url: 'http://localhost:5656',
                description: 'Development server',
            },
        ],
    },
    apis: ["./src/routes/*.ts"]
}
const swaggerSpec = swaggerJsDoc(options)
function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/swagger/v1/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

}
export default swaggerDocs;