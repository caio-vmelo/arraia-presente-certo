
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID") || "";
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID") || "";
const EMAILJS_PUBLIC_KEY = Deno.env.get("EMAILJS_PUBLIC_KEY") || "";
const EMAILJS_OWNER_TEMPLATE_ID = Deno.env.get("EMAILJS_OWNER_TEMPLATE_ID") || "";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders 
    });
  }
  
  try {
    const { type, data } = await req.json();
    
    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: "Tipo de e-mail e dados são obrigatórios" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Since we can't use EmailJS directly in an edge function (server-side),
    // we'll log the email that would be sent and return a success response
    
    console.log(`Email type ${type} requested for:`, JSON.stringify(data));
    
    if (type === "reservation") {
      console.log(`Would send reservation confirmation email to: ${data.recipientEmail}`);
      console.log(`Email content: Olá ${data.senderName}, sua reserva do presente "${data.giftName}" foi confirmada!`);
      // In a real implementation:
      // await sendEmailWithSupportedProvider(data.recipientEmail, `Reserva confirmada: ${data.giftName}`, `Olá ${data.senderName}, sua reserva do presente "${data.giftName}" foi confirmada!`);
    } else if (type === "notification") {
      console.log(`Would send owner notification email about: ${data.giftName} reserved by ${data.senderName}`);
      console.log(`Email content: ${data.senderName} (${data.recipientEmail}) reservou o presente "${data.giftName}"`);
      // In a real implementation:
      // await sendEmailWithSupportedProvider("viniciuscaioml@gmail.com", `Presente Reservado: ${data.giftName}`, `${data.senderName} (${data.recipientEmail}) reservou o presente "${data.giftName}"`);
    } else {
      return new Response(
        JSON.stringify({ error: "Tipo de e-mail inválido" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Return a successful response with more detailed information
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: type === "reservation" 
          ? `Email de reserva simulado para ${data.recipientEmail}` 
          : `Email de notificação simulado para o proprietário`
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
