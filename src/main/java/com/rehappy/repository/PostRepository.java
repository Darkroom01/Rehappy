package com.rehappy.repository;

import com.rehappy.model.Post;
import com.rehappy.model.Post.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategory(Category category);
}
