package lt.techin.exam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AutoServiceDto {
	private Long id;
	private String title;
	private String address;
	private Long directorId;
}
