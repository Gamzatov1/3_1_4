package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repo.RoleRepo;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepo roleRepo;

    @Autowired
    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Role getRoleById(Long id) {
        return roleRepo.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void saveRole(Role role) {
        roleRepo.save(role);
    }

    @Override
    @Transactional
    public void deleteRole(Long id) {
        roleRepo.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Role findByName(String name) {
        return roleRepo.findByName(name);
    }
} 