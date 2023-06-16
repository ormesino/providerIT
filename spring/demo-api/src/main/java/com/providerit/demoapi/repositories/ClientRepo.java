package com.providerit.demoapi.repositories;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.providerit.demoapi.models.Client;

@Repository
public class ClientRepo {

  private static String INSERT = "INSERT INTO Client (fullName) values (?)";
  private static String INDEX = "SELECT * FROM CLIENT";
  private static String UPDATE = "UPDATE CLIENT SET fullName = ? WHERE id = ?";
  private static String DELETE = "DELETE FROM CLIENT WHERE id = ?";

  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Client create(Client client) {
    jdbcTemplate.update(INSERT, new Object[] { client.getFullName() });

    return client;
  }

  public List<Client> index() {
    return jdbcTemplate.query(INDEX, new RowMapper<Client>() {
      @Override
      public Client mapRow(ResultSet resultSet, int i) throws SQLException {
        Integer id = resultSet.getInt("id");
        String fullName = resultSet.getString("fullName");
        return new Client(id, fullName);
      }
    });
  }

  public List<Client> indexByName(String fullName) {
    return jdbcTemplate.query(INDEX.concat(" WHERE fullName like ?"), new RowMapper<Client>() {
      @Override
      public Client mapRow(ResultSet resultSet, int i) throws SQLException {
        Integer id = resultSet.getInt("id");
        String fullName = resultSet.getString("fullName");
        return new Client(id, fullName);
      }
    } , new Object[] { "%" + fullName + "%" });
  }

  public Client update(Client client) {
    jdbcTemplate.update(UPDATE, new Object[] { client.getFullName(), client.getId() });

    return client;
  }

  public void delete(Client client) {
    jdbcTemplate.update(DELETE, new Object[] { client.getId() });
  }
}
