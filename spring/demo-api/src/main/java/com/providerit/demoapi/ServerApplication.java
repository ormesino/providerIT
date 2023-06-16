package com.providerit.demoapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.providerit.demoapi.models.Client;
import com.providerit.demoapi.repositories.ClientRepo;

@SpringBootApplication
public class ServerApplication {

	@Bean
	public CommandLineRunner init(@Autowired ClientRepo clients) {
		return args -> {
			clients.create(new Client("Pedro"));
			clients.create(new Client("Mateus"));

			List<Client> allClients = clients.index();
			allClients.forEach(System.out::println);

			allClients.forEach(c -> {
				c.setFullName(c.getFullName() + " [ATUALIZADO]");
				clients.update(c);
			});

			allClients.forEach(System.out::println);

			clients.indexByName("Ma").forEach(System.out::println);

			clients.index().forEach(c -> {
				clients.delete(c);
			});

			if (clients.index().isEmpty()) {
				System.out.println("Nenhum cliente foi encontrado");
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
}
