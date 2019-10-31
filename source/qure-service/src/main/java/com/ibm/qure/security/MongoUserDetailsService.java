package com.ibm.qure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class MongoUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = repository.findByUsername(username).get();
		System.out.print("Email is " + username);

		if (user == null) {
			throw new UsernameNotFoundException("User not found");

		}
		System.out.println(username);
		System.out.println("Inside loadByUserName");

		System.out.println(user);
//	    System.out.println( new User(user.getName(), user.getPassword(), AuthorityUtils.createAuthorityList("ROLE_" + user.getRole())));
		return new User(user.getUsername(), user.getPassword(),
				AuthorityUtils.createAuthorityList("ROLE_" + user.getRole()));

	}

}