package com.ssafy.PloMeet.model.repository;

import com.ssafy.PloMeet.model.entity.Trashcan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrashcanRepository extends JpaRepository<Trashcan, String> {
    public List<Trashcan> findAll();
}
