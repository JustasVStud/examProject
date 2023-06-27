1 Projekto exam folderi atsidarome per IDE
2 Projekto exam.front folderi atsidarome per vsCode
3 Projekto back end pasirenkame kokia norime naudoti db ir kita uzkomentuojame"
	
	//Myslq parametrai
	spring.jpa.database=mysql
	spring.jpa.hibernate.ddl-auto=create
	spring.datasource.url=jdbc:mysql://localhost:3306/exam
	spring.datasource.username=Exam.user1
	spring.datasource.password=Exam.user1
	spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
	
	//H2 parametrai
	#spring.jpa.database=h2
	#spring.h2.console.enabled=true
	#spring.h2.console.path=/console
	#spring.datasource.url=jdbc:h2:mem:exam
	#spring.datasource.username=sa
	#spring.datasource.password=
	#spring.jpa.show-sql=true
	#spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
	#spring.jpa.hibernate.ddl-auto=create
4. norint naudoti mysql reikia susikurti savo mysql hoste tuscia schema su vardu exam ir jai sukurti nauja vartotoja su visais grants kurio username ir password yra Exam.user1
5. tai susikofigavus Back end IDE reikia pasileisti ExamAplication spring boot aplikacija
6. Vs code arba exam.from per terminala pasileisti npm start komanda.
