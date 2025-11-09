extends Area2D
class_name CollectableComponent

func _on_body_entered(body):
	if body is BaseCharacter:
		_consume(body)
		queue_free() #deleta o objeto
		
func _consume(body) -> void:
	
	pass
