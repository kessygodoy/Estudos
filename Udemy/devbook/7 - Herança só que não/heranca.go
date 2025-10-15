package main

type pessoa struct {
	nome      string
	sobrenome string
	idade     uint8
	altura    uint8
}

type estudante struct {
	pessoa
	curso     string
	faculdade string
}

func main() {
	println("Olá Mundo!")

	p1 := pessoa{"João", "Pedro", 20, 178}
	println(p1.nome)

	e1 := estudante{p1, "Engenharia", "USP"}
	println(e1.faculdade)
}
