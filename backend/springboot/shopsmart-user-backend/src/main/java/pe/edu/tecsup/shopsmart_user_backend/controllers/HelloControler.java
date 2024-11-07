package pe.edu.tecsup.shopsmart_user_backend.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HelloControler {


    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot is working!";
    }

}
