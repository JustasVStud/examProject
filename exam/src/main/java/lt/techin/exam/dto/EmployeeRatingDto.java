package lt.techin.exam.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRatingDto {
	private Long id;
	private BigDecimal rating;
	private Long employeeId;
}
