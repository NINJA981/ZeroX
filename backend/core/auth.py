import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from core.config import settings

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Decodes and validates the Supabase JWT token from the Authorization header.
    Returns a dict with user information (e.g. user_id/sub).
    """
    token = credentials.credentials
    try:
        # Supabase tokens use HS256 and are signed with SUPABASE_JWT_SECRET.
        # We disable aud validation in case the aud claim is set to "authenticated" or "anon"
        # but we can optionally check it ourselves.
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_aud": False}
        )
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload: missing 'sub' claim."
            )
            
        return {
            "user_id": user_id,
            "email": payload.get("email"),
            "token": token # Pass token along to allow authenticated Supabase calls
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired."
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}"
        )
