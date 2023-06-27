package lt.techin.exam.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee_rating")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRating {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "rating")
	private BigDecimal rating;
	@JoinColumn(name = "employee_id", nullable = false)
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	private Employee employee;
}
