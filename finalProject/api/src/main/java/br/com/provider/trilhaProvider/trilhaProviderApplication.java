package br.com.provider.trilhaProvider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import br.com.provider.trilhaProvider.config.ApplicationProperties;

@SpringBootApplication
@EnableConfigurationProperties({ ApplicationProperties.class })
public class trilhaProviderApplication {

	public static void main(String[] args) {
		SpringApplication.run(trilhaProviderApplication.class, args);
	}
}
