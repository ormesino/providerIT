public class ContaPoupanca extends Conta {
  private int diaDeRendimento;

  public ContaPoupanca(String nome, int numConta, float saldo, int dia) {
    super(nome, numConta, saldo);
    this.diaDeRendimento = dia;
  }
  
  // Métodos
  public void calcularNovoSaldo(float taxa, int diaAtual) {
    if (this.diaDeRendimento < diaAtual) {
      this.setSaldo(this.getSaldo() * (1 + taxa/100) + 100);
      System.out.println("Novo saldo após rendimento: R$" + this.getSaldo());
    } else {
      this.setSaldo(this.getSaldo() * (1 + taxa/100));
      System.out.println("Novo saldo após rendimento: R$" + this.getSaldo());
    }
  }
}
