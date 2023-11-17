package com.vti.dulichviet_team_1.repository.Specification;

import com.vti.dulichviet_team_1.modal.dto.ViewListRequestDto;
import com.vti.dulichviet_team_1.modal.entity.Tour;
import org.springframework.data.jpa.domain.Specification;

public class TourSpecification {

    public static Specification<Tour> buildCondition(ViewListRequestDto viewListRequestDto) {
        return Specification.where(buildConditionTitle(viewListRequestDto))
                .and(Specification.where(buildConditionDepart(viewListRequestDto))
                        .and(Specification.where(buildConditionArrival(viewListRequestDto))
                                        .and(Specification.where(buildConditiontTransport(viewListRequestDto))
                                                .and(Specification.where(buildConditiontContent(viewListRequestDto))
                                                        .and(Specification.where(buildConditiontStatus(viewListRequestDto))
                                                                .and(Specification.where(buildConditiontPrice(viewListRequestDto))
                                                                        .and(Specification.where(buildConditiontType(viewListRequestDto))
                                                                        )))))));
    }

    public static Specification<Tour> buildConditionTitle(ViewListRequestDto viewListRequestDto) {

        if (viewListRequestDto.getTitle() != null && !"".equals(viewListRequestDto.getTitle())) {

            // TẠO 1 ĐIỂU KIỆN ĐỂ TÌM KIẾM VỚI TRƯỜNG TITLE

            return ((root, query, criteriaBuilder) -> {
                // ROOT: CHỌN CỘT, FIELD, ĐỂ TÌM KIẾM (GIÁ TRỊ LÀ THUỘC TÍNH TRONG JAVA)
                // CRI: KHAI BÁO LOẠI SO SÁNH DỮ LIỆU. ( LỚN HƠN, NHỎ HƠN, EQUAL, LIKE,.... )
                return criteriaBuilder.like(root.get("title"), "%" + viewListRequestDto.getTitle() + "%");
            });
        } else {
            return null;
        }
    }

    public static Specification<Tour> buildConditionDepart(ViewListRequestDto viewListRequestDto) {
        if (viewListRequestDto.getDepart() != null && !"".equals(viewListRequestDto.getDepart())) {

            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("depart"), "%" + viewListRequestDto.getDepart() + "%");
            };

        } else {
            return null;
        }
    }

    public static Specification<Tour> buildConditionArrival(ViewListRequestDto viewListRequestDto) {
        if (viewListRequestDto.getArrival() != null && !"".equals(viewListRequestDto.getArrival())) {

            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("arrival"), "%" + viewListRequestDto.getArrival() + "%");
            };

        } else {
            return null;
        }
    }

    public static Specification<Tour> buildConditiontTransport(ViewListRequestDto viewListRequestDto) {
        if (viewListRequestDto.getTransport() != null && viewListRequestDto.getTransport().size() > 0) {

            return (root, query, criteriaBuilder) -> {
                return root.get("transport").in(viewListRequestDto.getTransport());
            };

        } else {
            return null;
        }
    }

    public static Specification<Tour> buildConditiontContent(ViewListRequestDto viewListRequestDto) {
        if (viewListRequestDto.getContent() != null && !"".equals(viewListRequestDto.getContent())) {

            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.like(root.get("content"), "%" + viewListRequestDto.getContent() + "%");

            };
        } else {
            return null;
        }
    }

    public static Specification<Tour> buildConditiontStatus(ViewListRequestDto viewListRequestDto) {
        if (viewListRequestDto.getStatus() != null && viewListRequestDto.getStatus().size() > 0) {

            return (root, query, criteriaBuilder) -> {
                return root.get("status").in(viewListRequestDto.getStatus());
            };

        } else {
            return null;
        }
    }

    public static Specification<Tour> buildConditiontPrice(ViewListRequestDto viewListRequestDto) {
        if (viewListRequestDto.getMinPrice() != 0 && viewListRequestDto.getMaxPrice() != 0) {
            return (root, query, criteriaBuilder) -> {
                return criteriaBuilder.between(root.get("price"), viewListRequestDto.getMinPrice(), viewListRequestDto.getMaxPrice());
            };

        } else {
            return null;
        }

    }

    public static Specification<Tour> buildConditiontType(ViewListRequestDto viewListRequestDto) {
        if (viewListRequestDto.getType() != null && viewListRequestDto.getType().size() > 0) {

            return (root, query, criteriaBuilder) -> {
                return root.get("type").in(viewListRequestDto.getType());
            };

        } else {
            return null;
        }
    }


}
