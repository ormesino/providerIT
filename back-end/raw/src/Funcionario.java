public class Funcionario {
  private float salario;
  private String nome;
  private String cpf;

  public Funcionario(String nome, String cpf, float salario) {
    this.nome = nome;
    this.cpf = cpf;
    this.salario = salario;
  }

  public void info() {
    System.out.println(this.nome + " de CPF " + this.cpf + " recebe R$ " + this.salario + " por mês.");
  }
}
