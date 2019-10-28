package com.ibm.qure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
	
	@Autowired
	  MongoUserDetailsService userDetailsService;
	  
	  @Override
	  protected void configure(HttpSecurity http) throws Exception {
		  System.out.println("Security Configuration...");
	    http
	      .csrf().disable()
	      .authorizeRequests()
	      .antMatchers("/qure/blogs/**").permitAll()
	      .antMatchers("/qure/patients/register").permitAll()
	      .antMatchers("/qure/patients/login").permitAll()
	      .antMatchers("/qure/patients/auth").permitAll()
	      .antMatchers("/qure/patients").authenticated()
	      .antMatchers("/qure/doctors/register").permitAll()	      
	      .antMatchers("/qure/doctors/login").permitAll()
	      .antMatchers("/qure/doctors/auth").permitAll()
	      .antMatchers("/qure/doctors").authenticated()
//	      .antMatchers("/**").permitAll()
//	      .anyRequest().permitAll()
	      .and().httpBasic()
	      .and().formLogin();
//	      .and().sessionManagement().disable();
	  }
	  
	  @Bean
	    public BCryptPasswordEncoder passwordEncoder() {
	        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
	        return bCryptPasswordEncoder;
	    }
	  
	
//	@Override
//	public void configure(AuthenticationManagerBuilder builder) throws Exception {
//		  builder.userDetailsService(userDetailsService);
//	}
  
	  

}
