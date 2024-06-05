package com.UserManagement.business;

import com.UserManagement.dao.model.UserLoginModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	IUserManagerBus usermanagerBus;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{




			UserLoginModel userLoginModel = usermanagerBus.getUserLoginDetails(username);

			if(userLoginModel == null)
				throw new UsernameNotFoundException("User not found with username: " + username);

			return new User(userLoginModel.getPhone(), userLoginModel.getPassword(),
					getAuthorities(userLoginModel.getPrivilegelist()));

	}

	private Collection<? extends GrantedAuthority> getAuthorities(
			List<String> roles) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		for (String role: roles) {
			authorities.add(new SimpleGrantedAuthority(role));
		}

		return authorities;
	}

}