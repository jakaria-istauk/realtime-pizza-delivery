const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    return{
        login(req, res){            
            res.render('auth/login')
        },

        register(req, res){            
            res.render('auth/register')
        },

        async userRegister(req, res){
            const { name, email, password } = req.body 

            //valodate request
            if( !name || !email || !password ){
                req.flash('error', 'All Fields are require')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            // check unique email
            User.exists({email: email}, (err, result) => {
                if(result){
                    req.flash('error', 'Email already exist')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register') 
                }
            })

            //Hash password
            const hashedPassword = await bcrypt.hash(password, 10)
            //create user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then(()=>{
                //Login


                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register') 
            })
        },        

        userLogin( req, res, next ){
            
            const { email, password } = req.body 

            if(!email || !password ){
                req.flash('error', 'All Fields are require')
                return res.redirect('/login')
            }

            passport.authenticate('local', (err, user, info)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },

        userLogout(req, res){
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports = authController;