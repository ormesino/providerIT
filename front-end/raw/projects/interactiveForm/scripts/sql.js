//   Configuração e criação do banco de dados
var db = openDatabase('db', '1.0', 'Banco de Dados Teste', 2 * 1024 * 1024);

export default db;