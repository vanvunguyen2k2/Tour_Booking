package com.vti.dulichviet_team_1.repository;

import com.vti.dulichviet_team_1.modal.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IAccountRepository extends JpaRepository<Account, Integer>, JpaSpecificationExecutor<Account> {
        boolean existsByEmail(String email);
        boolean existsByUsername(String username);
        Optional<Account> findAccountByUsername(String username);
}
