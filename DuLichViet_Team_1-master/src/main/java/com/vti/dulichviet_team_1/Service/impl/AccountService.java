package com.vti.dulichviet_team_1.service.impl;

import com.vti.dulichviet_team_1.config.exception.AppException;
import com.vti.dulichviet_team_1.config.exception.ErrorEnum;
import com.vti.dulichviet_team_1.modal.dto.AccountSearchRequest;
import com.vti.dulichviet_team_1.repository.IAccountRepository;
import com.vti.dulichviet_team_1.repository.specification.AccountSpecification;
import com.vti.dulichviet_team_1.service.IAccountService;
import com.vti.dulichviet_team_1.modal.entity.Account;

import com.vti.dulichviet_team_1.modal.entity.AccountStatus;
import com.vti.dulichviet_team_1.modal.entity.Role;
import com.vti.dulichviet_team_1.request.AccountCreateRq;
import com.vti.dulichviet_team_1.request.AccountUpdateRq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements IAccountService, UserDetailsService {

    private final IAccountRepository accountRepository;


    @Autowired
    public AccountService(IAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Optional<Account> getAccountById(int id) {

        return accountRepository.findById(id);
    }


    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createAccount(AccountCreateRq accountCreateRq) {
        if (accountRepository.existsByEmail(accountCreateRq.getEmail())){
            throw new RuntimeException("Email da ton tai");
        }
        if (accountRepository.existsByUsername(accountCreateRq.getUsername())){
            throw new RuntimeException("Username da ton tai");
        }
        Account account = new Account();
        account.setAddress(accountCreateRq.getAddress());
        account.setEmail(accountCreateRq.getEmail());
        account.setPhone(accountCreateRq.getPhone());
        account.setFullName(accountCreateRq.getFullName());
        account.setUsername(accountCreateRq.getUsername());
        account.setRole(Role.USER);
        account.setStatus(AccountStatus.ACTIVE);

        String newPasswordEncoder = passwordEncoder.encode(accountCreateRq.getPassword());
        System.out.println(newPasswordEncoder);
        account.setPassword(newPasswordEncoder);
        System.out.println(account);
        accountRepository.save(account);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Account updateAccount(int id,AccountUpdateRq accountUpdateRq) {
        Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("khong tim thay account"));

        account.setAddress(accountUpdateRq.getAddress());
        account.setEmail(accountUpdateRq.getEmail());
        account.setPhone(accountUpdateRq.getPhone());
        account.setFullName(accountUpdateRq.getFullName());
        account.setUsername(accountUpdateRq.getUsername());
        account.setRole(accountUpdateRq.getRole());
        account.setStatus(accountUpdateRq.getStatus());
        account.setPassword(accountUpdateRq.getPassword());

        return  accountRepository.save(account);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteAccount(int id) {
    Optional<Account> optionalAccount = accountRepository.findById(id);
    if (optionalAccount.isPresent()){
        accountRepository.deleteById(id);
    }else {
      throw new RuntimeException("khong tim thay account");
    }
    }

  @Override
  public Page<Account> search(AccountSearchRequest request) {
    PageRequest pageRequest = null;
    if ("DESC".equals(request.getSortType())) {
      pageRequest = PageRequest.of(request.getPage() - 1, request.getSize(), Sort.by(request.getSortField()).descending());
    } else {
      pageRequest = PageRequest.of(request.getPage() - 1, request.getSize(), Sort.by(request.getSortField()).descending());
    }
    Specification<Account> condition = AccountSpecification.buildCondition(request);
    return accountRepository.findAll(condition, pageRequest);
  }

  @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Account> optionalAccount = accountRepository.findAccountByUsername(username);
        if (!optionalAccount.isPresent()) {

            throw new AppException(ErrorEnum.NOT_FOUND_USERNAME);
        }

        else {
            Account account = optionalAccount.get();
            /**
             * userdetails.getusername(): username
             * userdetails.getPassword(): mật khẩu đã đưuọc mã hóa
             * grantedAuthorityList: List quyền của user
             */

            List<GrantedAuthority> authoritiesList = new ArrayList<>();

//           Add thêm những permistion vào (chính là thằng Role() bên dưới);
            authoritiesList.add(account.getRole());

            return new org.springframework.security.core.userdetails.User(account.getUsername(), account.getPassword(), authoritiesList);
        }


    }
}
