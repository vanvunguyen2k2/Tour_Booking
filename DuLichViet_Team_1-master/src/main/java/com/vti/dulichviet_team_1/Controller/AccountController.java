package com.vti.dulichviet_team_1.controller;

import com.vti.dulichviet_team_1.modal.dto.AccountSearchRequest;
import com.vti.dulichviet_team_1.service.impl.AccountService;
import com.vti.dulichviet_team_1.modal.entity.Account;

import com.vti.dulichviet_team_1.request.AccountCreateRq;
import com.vti.dulichviet_team_1.request.AccountUpdateRq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin("*")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/get-all")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public Optional<Account> getAccountById(@PathVariable int id) {
        return accountService.getAccountById(id);
    }

    @PostMapping("/create")
    public void createAccount(@RequestBody AccountCreateRq account) {
         accountService.createAccount(account);
    }

    @PutMapping("/update/{id}")
    public Account updateAccount(@PathVariable int id ,@RequestBody AccountUpdateRq account) {
        return accountService.updateAccount(id,account);
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable int id) {
        accountService.deleteAccount(id);
    }

  @PostMapping("/search")
  public Page<Account> search(@RequestBody AccountSearchRequest request) {
    return accountService.search(request);
  }

}
