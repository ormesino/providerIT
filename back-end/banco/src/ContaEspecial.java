public class ContaEspecial extends Conta {
  private float limite;

  public ContaEspecial(String nome, int numConta, float saldo, float limite) {
    super(nome, numConta, saldo);
    this.limite = limite;
  }

  public void setLimite(float limite) {
    this.limite = limite;
  }

  public float getLimite() {
    return limite;
  }

  @Override
  public void sacar(float valor) {
    if (this.getSaldo() - valor + limite >= 0){
      this.setSaldo(this.getSaldo() - valor);
      System.out.println("Saque realizado com sucesso.");
    } else { 
      System.out.println("Saldo insuficiente");
    }
  }
}
