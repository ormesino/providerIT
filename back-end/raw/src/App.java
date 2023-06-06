public class App {
	public static void main(String[] args) {
		// Testes
		ContaPoupanca c1 = new ContaPoupanca("Pedro", 1, 700, 10);
		c1.mostrarDadosDaConta();
		c1.sacar(15);
		c1.calcularNovoSaldo(10, 15);

		ContaEspecial c2 = new ContaEspecial("Mateus", 2, 400, 150);
		c2.depositar(200);
		c2.sacar(700);
		c2.mostrarDadosDaConta();
	}
}
