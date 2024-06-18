package com.UserManagement.business;

import com.UserManagement.dao.entities.Privilege;
import com.UserManagement.dao.entities.Role;
import com.UserManagement.dao.model.UserLoginModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private IUserManagerBus userManagerBus;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserLoginModel userLoginModel = userManagerBus.getUserLoginDetails(username);

		if (userLoginModel == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}

		return buildUserDetails(userLoginModel);
	}

	private UserDetails buildUserDetails(UserLoginModel userLoginModel) {
		List<GrantedAuthority> authorities = userLoginModel.getPrivilegelist().stream()
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());

		return new org.springframework.security.core.userdetails.User(
				userLoginModel.getPhone(),
				userLoginModel.getPassword(),
				authorities
		);
	}
}
