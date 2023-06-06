package br.com.providerit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ServerApplication {

  @Value("${application.name}")
  private String applicationName;

  @GetMapping("/")
  public String app() {
    return applicationName;
  }

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }
}
