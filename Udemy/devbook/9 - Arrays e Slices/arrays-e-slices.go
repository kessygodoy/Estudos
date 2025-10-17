package main

import "reflect"

func main() {
	// println("Arrays e slices")

	// var array1 [5]int
	// println(array1)

	array2 := [5]string{"Posição 1", "Posição 2", "Posição 3", "Posição 4", "Posição 5"}
	// println(array2)
	// // array2[5] = "Posição 6"
	// println(array2)

	array3 := [...]int{1, 2, 3, 4, 5}
	// println(array3)

	slice := []int{10, 11, 12, 13, 14, 15, 16, 17}
	// println(slice)

	println(reflect.TypeOf(slice))
	println(reflect.TypeOf(array3))

	slice = append(slice, 18)
	println(slice)

	slice2 := array3[1:3] //cria um array que pega do 1 ao indice 2 no array3 (3 fica de fora)
	println(slice2)

	array2[1] = "Posiçao alterada"
	println(array2)
}
