package br.com.provider.trilhaProvider.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class Initializer implements CommandLineRunner {

  @Override
  public void run(String... args) {
    log.info("Running Initializer.....");
  }
}
