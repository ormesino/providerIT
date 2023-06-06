public class Gerente extends Funcionario{
  private String id;
  private String numSala;

  public Gerente(String nome, String cpf, float salario, String idGerencia, String numSala) {
    super(nome, cpf, salario);
    this.id = idGerencia;
    this.numSala = numSala;
  }
}
