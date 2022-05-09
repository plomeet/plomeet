package com.ssafy.PloMeet.api.service;

import com.ssafy.PloMeet.model.entity.User;
import com.ssafy.PloMeet.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepo;

    @Override
    public Optional<User> getUserInfo(Long userId) throws Exception {
        return userRepo.findById(userId);
    }
}
