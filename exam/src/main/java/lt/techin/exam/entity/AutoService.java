package lt.techin.exam.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "auto_service")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutoService {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "title")
	private String title;
	@Column(name = "address")
	private String address;
	@OneToMany(mappedBy = "autoService", cascade = CascadeType.ALL, orphanRemoval = false)
	private List<Employee> employees = new ArrayList<>();
	@JoinColumn(name = "director_id", nullable = true)
	@ManyToOne(optional = true, fetch = FetchType.EAGER)
	private Employee director;
}
