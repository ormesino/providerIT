public class Conta {
  private String cliente;
  private int numConta;
  private float saldo;

  public Conta(String nomeDoClient, int numConta, float saldo) {
    this.cliente = nomeDoClient;
    this.numConta = numConta;
    this.saldo = saldo;
  }

  // Getters
  public String getCliente() {
    return cliente;
  }

  public int getNumConta() {
    return numConta;
  }

  public float getSaldo() {
    return saldo;
  }

  // Setters
  public void setCliente(String cliente) {
    this.cliente = cliente;
  }

  public void setNumConta(int numConta) {
    this.numConta = numConta;
  }

  public void setSaldo(float saldo) {
    this.saldo = saldo;
  }

  // Métodos
  public void depositar(float valor) {
    this.saldo = this.saldo + valor;
    System.out.println("Depósito realizado com sucesso, novo saldo: R$" + this.saldo);
  }

  public void mostrarDadosDaConta() {
    System.out.println("Conta de número: " + this.numConta + "\n\tNome do Cliente: " + this.cliente + "\n\tSaldo da conta: R$" + this.saldo);
  }

  public void sacar(float valor) {
    if (this.saldo - valor >= 0) {
      this.saldo -= valor;
      System.out.println("Saque realizado com sucesso, novo saldo: R$" + this.saldo);
    }
    else
      System.out.println("Saldo insuficiente.");
  }
}
