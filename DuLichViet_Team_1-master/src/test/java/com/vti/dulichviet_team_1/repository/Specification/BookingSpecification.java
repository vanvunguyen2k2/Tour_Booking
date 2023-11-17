package com.vti.dulichviet_team_1.repository.Specification;

import com.vti.dulichviet_team_1.modal.entity.Booking;
import com.vti.dulichviet_team_1.request.BookingSearchRequest;
import org.springframework.data.jpa.domain.Specification;

public class BookingSpecification {

    public static Specification<Booking> buildCondition(BookingSearchRequest request) {
        return Specification.where(buildCondition(request))
                .and(buildConditionEmail(request))
                .and(buildConditionUserName(request))
                .and(buildConditionFullName(request))
                .and(buildConditionPhone(request))
                .and(buildConditionStatus(request));
    }


    public static Specification<Booking> buildConditionEmail(BookingSearchRequest request) {
        if (request.getEmail() != null && !"".equals(request.getEmail())) {
            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("email"), "%" + request.getEmail() + "%");
            };
        } else {
            return null;
        }
    }


    public static Specification<Booking> buildConditionUserName(BookingSearchRequest request) {
        if (request.getUsername() != null && !"".equals(request.getUsername())) {
            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("username"), "%" + request.getUsername() + "%");
            };
        } else {
            return null;
        }
    }


    public static Specification<Booking> buildConditionFullName(BookingSearchRequest request) {
        if (request.getFullName() != null && !"".equals(request.getFullName())) {
            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("fullName"), "%" + request.getFullName() + "%");
            };
        } else {
            return null;
        }
    }


    public static Specification<Booking> buildConditionPhone(BookingSearchRequest request) {
        if (request.getPhone() != null && !"".equals(request.getPhone())) {
            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("phone"), "%" + request.getPhone() + "%");
            };
        } else {
            return null;
        }
    }


    public static Specification<Booking> buildConditionStatus(BookingSearchRequest request) {
        if (request.getStatus() != null && request.getStatus().size() > 0) {
            return (root, query, criteriaBuilder) -> {
                return root.get("status").in(request.getStatus());
            };
        } else {
            return null;
        }
    }

}
