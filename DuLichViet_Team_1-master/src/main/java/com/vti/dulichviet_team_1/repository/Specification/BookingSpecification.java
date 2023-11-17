package com.vti.dulichviet_team_1.repository.specification;

import com.vti.dulichviet_team_1.modal.entity.Account;
import com.vti.dulichviet_team_1.modal.entity.Booking;
import com.vti.dulichviet_team_1.modal.entity.BookingStatus;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class BookingSpecification {
  // Một phương thức tĩnh tạo ra Specification để lọc các thực thể Booking dựa trên nhiều tham số.
  public static Specification<Booking> filterByParams(String username, String fullName, String phone, String email, Set<BookingStatus> status) {
    return (root, query, criteriaBuilder) -> {
      List<Predicate> predicates = new ArrayList<>();

      // Nếu cung cấp username, thêm điều kiện để lọc theo username.
      if (username != null) {
        Join<Booking, Account> accountJoin = root.join("account");
        predicates.add(criteriaBuilder.like(accountJoin.get("username"), "%" + username + "%"));
      }

      // Nếu cung cấp fullName, thêm điều kiện để lọc theo fullName.
      if (fullName != null) {
        Join<Booking, Account> accountJoin = root.join("account");
        predicates.add(criteriaBuilder.like(accountJoin.get("fullName"), "%" + fullName + "%"));
      }

      // Nếu cung cấp phone, thêm điều kiện để lọc theo phone.
      if (phone != null) {
        Join<Booking, Account> accountJoin = root.join("account");
        predicates.add(criteriaBuilder.like(accountJoin.get("phone"), "%" + phone + "%"));
      }

      // Nếu cung cấp email, thêm điều kiện để lọc theo email.
      if (email != null) {
        Join<Booking, Account> accountJoin = root.join("account");
        predicates.add(criteriaBuilder.like(accountJoin.get("email"), "%" + email + "%"));
      }

      // Nếu cung cấp status, thêm điều kiện để lọc theo status.
      if (status != null) {
        predicates.add(criteriaBuilder.equal(root.get("status"), status));
      }

      // Kết hợp tất cả các điều kiện đã tạo bằng 'AND' và trả về Specification cuối cùng.
      return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
