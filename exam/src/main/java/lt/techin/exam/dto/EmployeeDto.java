package lt.techin.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
	private Long id;
	private String name;
	private String surname;
	private String specialty;
	private String city;
	private Long autoServiceId;
}
