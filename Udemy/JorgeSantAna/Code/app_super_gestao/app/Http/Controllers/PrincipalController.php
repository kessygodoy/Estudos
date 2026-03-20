<?php

namespace App\Http\Controllers;

use Il6uminate\Http\Request;

class PrincipalController extends Controller
{
    public function principal()
    {
        return view('site.principal');
    }
}
