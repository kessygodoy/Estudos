extends CollectableComponent
class_name CollectableSword

func _consume(_body:BaseCharacter) -> void: #sobrcvarga de metodo
	_body.update_sword_state(true)
	
