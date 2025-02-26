package com.seomaniak.projecttaskmanagerapi.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Project Task Manager API",
                version = "1.0",
                description = "Project Task Manager API Documentation",
                contact = @Contact(
                        name = "Oufkir",
                        email = "ibrahimoufkir22@gmail.com"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"
                )
        ),
        servers = {
                @Server(
                        url = "http://localhost:8080/api/v1",
                        description = "Local server"
                )
        }
)
public class OpenAPIConfig {

}
